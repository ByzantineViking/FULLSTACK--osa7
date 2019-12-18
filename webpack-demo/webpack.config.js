const path = require('path')

// webpack only imported for DefinePlugin
const webpack = require('webpack')
/*
    Following have to be installed with npm install

    @babel/polyfill

    babel-loader
    @babel/preset-env
    @babel/preset-react

    style-loader
    css-loader


*/

const config = (env, argv) => {
    // Argv is used for accessing mode defined in npm script
    console.log('argv', argv.mode)

    const backend_url = argv.mode === 'production'
        ? 'https://radiant-plateau-25399.herokuapp.com/api/notes'
        : 'http://localhost:3001/notes'

    
    return {
        entry: ['@babel/polyfill', './src/index.js'],
        output: {
            path: path.resolve(__dirname, 'build'),
            filename: 'main.js'
        },
        // For continuous updating, without this wpuld open index.html in browser
        devServer: {
            contentBase: path.resolve(__dirname, 'build'),
            compress: true,
            port: 3000,
        },
        /* 
        No need for installing, 
        makes errors reference actual code rather than transpiled
        so that error pointers point to right places 
        */
        devtool: 'source-map',
        module: {
            rules: [
                // Modules for js
                {
                    test: /\.js$/,
                        loader: 'babel-loader',
                            query: {
                        // Transpile to ES5, and transpile JSX
                        presets: ['@babel/preset-env', '@babel/preset-react']
                    },
                },
                // Modules for css
                {
                    test: /\.css$/,
                        loaders: ['style-loader', 'css-loader'],
                },
            ],
        },
        /* webpack plugin for production configuration, 
           setting the global constant BACKEND_URL based on the current environment got from argv */
        plugins: [
            new webpack.DefinePlugin({
                BACKEND_URL: JSON.stringify(backend_url)
            })
        ]
    }
}
module.exports = config
