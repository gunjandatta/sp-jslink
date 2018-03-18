import { List } from "gd-sprest";

/**
 * Configuration
 */
export class ViewHelper {
    /**
     * Method to clear the jslink property.
     * @param listName - The list name to update.
     * @param viewName - The view name to update.
     */
    clearJSLink(listName: string, viewName: string) {
        // Uninstall the JSL
        return this.setJSLink(listName, viewName, "");
    }

    /**
     * Method to update a list view.
     * @param listName - The list name to update.
     * @param viewName - The view name to update.
     * @param jsLinkUrl - The JSLink property value.
     */
    setJSLink(listName: string, viewName: string, jsLinkUrl: string) {
        // Get the list
        (new List(listName))
            // Get the views
            .Views()
            // Get the view
            .getByTitle(viewName)
            // Execute the request
            .execute((view) => {
                // Ensure the view exists
                if (view.existsFl) {
                    // Update the JSLink property
                    view.update({
                        JSLink: jsLinkUrl
                    }).execute(() => {
                        // Log to the console
                        console.log("[JSLink] The JSLink property was updated for view '" + viewName + "' in list '" + listName + "'.");
                    });
                } else {
                    // Log to the console
                    console.log("[JSLink] The view '" + viewName + "' does not exist in list '" + listName + "'.");
                }
            });
    }
}