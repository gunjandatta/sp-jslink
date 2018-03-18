var path = require('path');

module.exports = {
    // Target the output of the typescript compiler
    context: path.join(__dirname, "src"),

    // File(s) to target
    entry: {
        template: "./template.tsx",
    },

    // Output
    output: {
        // Filename
        filename: "jslink_[name].js",
        // Folder
        path: path.join(__dirname, "dist")
    },

    // Files to resolve
    resolve: {
        extensions: [".css", ".js", ".jsx", ".ts", ".tsx"]
    },

    // Module to define what libraries with the compiler
    module: {
        // Rules
        rules: [
            {
                // Target the .css files
                test: /\.css/,
                // Exclude the node modules folder
                exclude: /node_modules/,
                // Define the compiler to use
                use: [
                    {
                        // Use the 'style-loader' library
                        loader: "style-loader"
                    },
                    {
                        // Use the 'css-loader' library
                        loader: "css-loader"
                    }
                ]
            },
            {
                // Target the .ts and .tsx files
                test: /\.tsx?$/,
                // Exclude the node modules folder
                exclude: /node_modules/,
                // Define the compiler to use
                use: [
                    {
                        // Use the 'babel-loader' library
                        loader: "babel-loader",
                        // Options
                        options: {
                            // Use the 'babel-preset-es2015' library
                            presets: ["es2015"]
                        }
                    },
                    {
                        // Use the 'ts-loader' library
                        loader: "ts-loader"
                    }
                ]
            }
        ]
    }
};
