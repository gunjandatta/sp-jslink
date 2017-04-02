import * as React from "react";

/**
 * Properties
 */
declare interface Props {
    data: Array<any>,
    wpId: string
}

/**
 * List View
 */
export class ListView extends React.Component<Props, any> {
    // Method to generate the table rows
    generateRows = () => {
        let rows = [];

        // Parse the data
        for(let i=0; i<this.props.data.length; i++) {
            let item = this.props.data[i];

            // Add the row
            rows.push(
                <tr id={item.ID} key={"template_row_" + i}>
                    <td>{item.ID}</td>
                    <td>{item.Title}</td>
                </tr>
            );
        }

        // Return the rows
        return rows;
    }

    // Render the component
    render() {
        return (
            <div>
                <h1>My Custom Component</h1>
                <p>The list has {this.props.data.length} items.</p>
                <table>
                    <thead>
                        <th>ID</th>
                        <th>Title</th>
                    </thead>
                    <tbody>
                        {this.generateRows()}
                    </tbody>
                </table>
            </div>
        );
    }
};