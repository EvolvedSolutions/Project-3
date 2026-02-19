'use strict';
/* TemplateProcessor Class
 * Replaces {{property}} placeholders in a template string
 * with values from a provided dictonay object
*/

class TemplateProcessor {
    /**
    * @param {string} template - String containing {{placeholders}}
    */
    constructor(template) {
        this.template = template;
    }
    /**
     * Fill template placeholders using dictionary values.
     * Missing properties are replaced with an empty string.
     *
     * @param {Object} dictionary - Key/value pairs for replacement
     * @returns {string} - Processed string
     */
    fillIn(dictionary){
        // Start with original template string
        let returnString = this.template;
          // loop through each property in the dictonary
        for (const property in dictionary){
            if (Object.prototype.hasOwnProperty.call(dictionary, property)) {
                // Build the placeholder format: {{property}}
                const placeholder = '{{' + property + '}}'
                // Replace ALL occurrences of that placeholder
                returnString = returnString.replaceAll(
                    placeholder,
                    dicotnary[property]
                );
            }
        }
         // Remove any remaining {{property}} not found in dictionary
       
        const regex = /{{.*}}/g;
        returnString = returnString.replaceAll(regex,"");
          // Return the final processed string
        return returnString;
    }
}
