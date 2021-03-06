/*
    Custom implementation of PDF Search
 */

import {PDFFindController} from 'pdfjs-dist/lib/web/pdf_find_controller';

class SearchController extends PDFFindController {
    constructor({pdfViewer}) {
        super({pdfViewer});
        this.textSource = [];
    
        this.state = {
            highlightAll: false,
            caseSensitive: false,
            phraseSearch: true
        }
    }
    
    /**
     * Store the plaintext of the document content for easy searching
     * @param pageNumber
     * @param text
     */
    setPageTextSource(pageNumber, text) {
        this.textSource[pageNumber] = this.normalize(text);
    }
    
    queryDocument(query) {
        query = this.normalize(query).toLowerCase();
        this.matches = [];
        
        for (let i = 0; i < this.pdfViewer.pagesCount; i++) {
            this.calcFindWordMatch(query, i, this.textSource[i].toLowerCase());
            if (this.pageMatches[i].length > 0)
                this.matches.push({page: i, match: this.pageMatches[i]});
        }
        
        this.executeCommand('find', {
            caseSensitive: false,
            highlightAll: true,
            query: query
        });
        
        const convertedMatches = this._convertMatchesForSnippet(this.matches, query);
        return this._renderSnippets(convertedMatches, query);
    }
    
    /**
     * Jump to the location and highlight the selected match
     * @param match Object with page, content and query properties
     */
    displayMatch(match) {
        this.selected.pageIdx = match.page;
        this.pdfViewer.currentPageNumber = match.page;
        
        const page = document.querySelector(`[data-page-number="${match.page}"]`);
        page.scrollIntoView();
        
    }
    
    /**
     * Convert an array of matches in the format {match: idx, page: page_number} to the actual
     * index location and offset of a query match.  This is not based on any text div content,
     * but the actual string content
     * @param matches array of matches returned from calcFindWordMatch
     * @param query keyword/phrase query being executed upon
     * @returns {Array}
     * @private
     */
    _convertMatchesForSnippet(matches, query) {
        if (!matches || matches.length === 0)
            return [];
        
        let i = 0,
            end = this.textSource.length - 1;
        
        const ret = [];
        
        // Iterate over all matches found
        for (let m = 0, len = matches.length; m < len; m++) {
            let pageMatch = matches[m];
            
            for (let matchItem = 0, matchItemLen = pageMatch.match.length; matchItem < matchItemLen; matchItem++) {
                let matchIdx = pageMatch.match[matchItem],
                    idx = 0;
                
                // loop over the strings for this particular page
                while (i !== end && matchIdx >= (idx + this.textSource[i].length)) {
                    idx += this.textSource[i].length;
                    i++;
                }
                
                const match = {
                    page: matches[m].page,
                    matchIdx,
                    queryLen: query.length,
                    begin: matchIdx - idx
                };
                
                matchIdx += query.length;
                
                // same loop as earlier, except not using and-equal-to in order to get
                // correct end position
                while (i !== end && matchIdx > (idx + this.textSource[i].length)) {
                    idx += this.textSource[i].length;
                    i++;
                }
                
                match.end = matchIdx - idx;
                ret.push(match);
                
            }
        }
        
        return ret;
    }
    
    /**
     * render the match results to snippets with highlighted result
     * @param matches Array of matches
     * @param query Search query
     * @return {Array}
     * @private
     */
    _renderSnippets(matches, query) {
        
        if (matches.length === 0)
            return;
        
        let textContent = this.textSource;
        const snippets = [];
        
        const joinString = (stringArray, before = true) => {
            if (stringArray) {
                
                if (stringArray.length <= 5) {
                    if (before)
                        return stringArray.slice(1).join(' ');
                    return stringArray.slice(0, stringArray.length - 1).join(' ');
                }
                else {
                    if (before)
                        return stringArray.slice(stringArray.length - 5).join(' ');
                    return stringArray.slice(0, 5).join(' ');
                }
            }
            
            return '';
        };
        
        for (let i = 0, len = matches.length; i < len; i++) {
            const begin = matches[i].matchIdx,
                  end = matches[i].matchIdx + query.length,
                  text = textContent[matches[i].page];
            
            const textQuery = text.substring(begin,  end),
                  before = text.substring(begin - 100, begin).split(' '),
                  after = text.substring(end,  end + 100).split(' ');
            
            const beforeString = joinString(before),
                  afterString = joinString(after);
            
            snippets.push({
                content: `${beforeString} <span class='result'>${textQuery}</span> ${afterString}`,
                originalContent: `${beforeString}${query}${afterString}`,
                page: matches[i].page + 1,
                query: query,
                properties: {
                    begin: matches[i].begin,
                    end: matches[i].end,
                    matchIdx: matches.matchIdx
                }
            });
        }
        
        return snippets
        
    }
}

export default SearchController;