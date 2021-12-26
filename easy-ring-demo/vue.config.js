module.exports = {
    publicPath: '/',
    configureWebpack: {
        module: {
            rules: [
                {
                    test: /easy-ring-default\.(wav)$/i,
                    loader: 'file-loader',
                    options: {
                        name: 'media/[name].[ext]'
                    },
                },
          ]
        }
    }
}