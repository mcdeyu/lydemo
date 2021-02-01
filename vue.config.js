module.exports = {
    devServer: {
        proxy:{
            "/lyEngineer": {
                target: 'http://192.168.16.168:8090',
                pathRewrite:{'^lyEngineer': ''}
            }
        }
    }
}