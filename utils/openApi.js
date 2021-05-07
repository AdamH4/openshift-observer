const yaml = require('js-yaml')

const validNames = [
    "openapi.yml",
    "openapi.yaml",
    "Openapi.yaml",
    "Openapi.yml",
    "OpenApi.yaml",
    "OpenApi.yml",
    "openApi.yaml",
    "openApi.yml",
    "docs.yaml",
    "docs.yml",
]

const yamlToJson = (file) => {
    return yaml.safeLoad(file)
}

module.exports = {
    validNames,
    yamlToJson,
}