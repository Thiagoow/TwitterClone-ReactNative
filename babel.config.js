module.exports = function (api) {
  api.cache(true)
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./src'],
          alias: {
            '#src': './src',
            '#assets': './src/assets',
            '#components': './src/components',
            '#factories': './src/core/factories',
            '#dataSource': './src/data/dataSource',
            '#model': './src/data/model',
            '#providers': './src/data/providers',
            '#useCases': './src/domain/useCases',
            '#config': './src/infra/config',
            '#http': './src/infra/http',
            '#navigators': './src/navigators',
            '#screens': './src/screens',
            '#theme': './src/theme',
            '#utils': './src/utils'
          }
        }
      ]
    ]
  }
}
