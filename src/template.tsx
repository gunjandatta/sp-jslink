import * as React from "react";
import { render } from "react-dom";
import { Helper, List } from "gd-sprest";
import { ListView } from "./components/listView";
import { Scripts } from "./scripts"

/**
 * SharePoint Core JS Methods
 */
declare var RenderBodyTemplate: any;
declare var RenderFooterTemplate: any;
declare var RenderHeaderTemplate: any;

/**
 * JSLink Helper Class
 */
class JSLinkDemo {
    private id = "template";
    private static viewIds = {};

    // Initialization
    init() {
        // Register the JSLink template(s)
        Helper.JSLink.register({
            Templates: {
                // Render the body
                Body: this.renderBody,
                // Render the footer
                Footer: this.renderFooter,
                // Clear the header
                Header: this.renderHeader
            }
        });
    }

    // Method to render the body
    private renderBody = (ctx) => {
        // Render the body
        return JSLinkDemo.viewIds[ctx.view] ? "" : RenderBodyTemplate(ctx);
    };

    // Method to render the footer
    private renderFooter = (ctx) => {
        // Get the target element
        let el = document.querySelector("#" + this.id + "_" + ctx.wpq);
        if (el) {
            // Render the list view
            render(<ListView data={ctx.ListData.Row} wpId={ctx.wpq} />, el);
            return "";
        }

        // Render the default footer
        return RenderFooterTemplate(ctx);
    };

    // Method to render the header
    private renderHeader = (ctx) => {
        // Get the list
        // Note - Not a fan of this synchronous request, but looking into a better solution.
        // Note - This is only needed if you are going to use >1 instance of this view on a wiki/webpart page.
        let view = (new List(ctx.ListTitle))
            // Get the view
            .Views(ctx.view)
            // Execute the request
            .executeAndWait();

        // Determine if this list is targeting this library
        if (view.JSLink.toLowerCase().indexOf("jslink_" + this.id + ".js") < 0) {
            // Render the default header
            return RenderHeaderTemplate(ctx);
        }

        // Save a reference to this view
        JSLinkDemo.viewIds[ctx.view] = true;

        // Render the element to render the chart to
        return "<div id='" + this.id + "_" + ctx.wpq + "'></div>";
    };
}

// Ensure this class is available globally
if (window["JSLinkDemo"] == null) {
    // Make the class available globally
    window["JSLinkDemo"] = new JSLinkDemo();

    // Add the scripts
    window["JSLinkDemo"].Scripts = Scripts;

    // Write the js to initialize the CSR override. This will ensure it works w/ MDS.
    document.write("<script type='text/javascript'>(function() { JSLinkDemo.init(); })()</script>");
}