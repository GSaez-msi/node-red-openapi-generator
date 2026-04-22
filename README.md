# Node-RED OpenAPI3 Documentation Generator

This package is a reimagination of @5minds/node-red-openapi-generator. The main idea behind it is adding better support for templates, stripping the need of modifying your settings.js file directly away.

As said before, this package is a fork of https://github.com/5minds/node-red-openapi-generator. All credits to them for their original work! This version implements a new node used for explicit template definitions inside the node-red environment, since there was no way of doing so in the original version.

## Usage

1. Install the node module

2. If you want to provide a template, you may use the swaggertemplate node.

3. This template will always be available to you straight from your editor. Change your Swagger UI on the fly, making maintenance super easy! You can give it things like Schemas, an API name, an openapi version...

4. After installing the package, you have the option to identify metadata for each HTTP-In node that will be used in the OpenAPI doc generation.

5. The generated OpenAPI documentation is then available at <http://YOUR_HOST_PATH/http-api/swagger.json>.

## Path OpenAPI Generation

Via the editor, you can define metadata for each particular HTTP-In node to be used in OpenAPI generation.

To do so:

1. Select an HTTP-In node in the editor.
![HTTP-In Node](readme_images/Capture_00.PNG?raw=true)

2. From the config panel, you can select a user-defined OpenAPI doc from the dropdown. You may create a new metadata definition by selecting "Add new swagger-doc..." and clicking the edit button.
![Config Panel](readme_images/Capture_01.PNG?raw=true)

3. This will launch the OpenAPI config panel, where you have three distinct tabs that make up the OpenAPI documentation.

#### Info

![Info Tab](readme_images/Capture_02.PNG?raw=true)

This tab allows you to provide the basic information about the attached paths.

* Summary - A short summary of what the operation does. For maximum readability in the Swagger-UI, this field SHOULD be less than 120 characters.
* Description - A verbose explanation of the operation behavior. [GFM syntax](https://help.github.com/articles/github-flavored-markdown) can be used for rich text representation.
* Tags - A list of tags for API documentation control. Tags can be used for logical grouping of operations by resources or any other qualifier. These should be provided as a comma-separated list.
* Deprecated - Declares this operation to be deprecated. Usage of the declared operation should be refrained.

#### Parameters

![Parameters Tab](readme_images/Capture_03.PNG?raw=true)

This tab allows you to configure the parameters that can be used with the particular operation.

* Name - The name of the parameter. Parameter names are case sensitive.
* In - The location of the parameter. There are four supported locations of the parameter:
  * _Query_ - Parameters that are appended to the URL. For example, in `/items?id=###`, the query parameter is `id`.
  * _Header_ - Custom headers that are expected as part of the request.
* Description - A brief description of the parameter. This could contain examples of use. [GFM syntax](https://help.github.com/articles/github-flavored-markdown) can be used for rich text representation.
* Required - Determines whether this parameter is mandatory.
* Type - The type of the parameter. Since the parameter is not located at the request body, it is limited to simple types (that is, not an object).
* Format - The extending format for the previously mentioned type.

If a body parameter is selected, the user will provide properties included in the body object, rather than specifying a type.

#### Responses

![Responses Tab](readme_images/Capture_04.PNG?raw=true)

This tab allows you to define the applicable responses that a user may receive back from the operation.

* Code - You can either select to define the default response, or to provide a specific HTTP status code that the response will be applicable for. A default response is used to cover other undeclared responses.
* Description - A short description of the response. This could contain examples of use. [GFM syntax](https://help.github.com/articles/github-flavored-markdown) can be used for rich text representation.
* Properties - The properties are the components that build up the schema of the response.
* Name - The key name for the particular property.
* Type - The type of the property.
* Format - The extending format for the previously mentioned type.

If no responses are provided, a default response with the reply "success" will be used.

#### Request Body

This tab allows you to define the request body for the operation.

* Description - A brief description of the request body.
* Required - A checkbox to indicate if the request body is required.
* Content Type - The media type of the request body (e.g., application/json).
* JSON Schema - A text area where you can define the JSON schema for the request body.
Example JSON Schema:
```json
{
  "type": "object",
  "properties": {
    "name": {
      "type": "string",
      "example": "John Doe"
    },
    "age": {
      "type": "integer",
      "example": 30
    },
    "email": {
      "type": "string",
      "format": "email",
      "example": "john.doe@example.com"
    }
  },
  "required": ["name", "email"]
}

```

## Swagger-UI

![Swagger-UI](readme_images/Capture_Swagger_UI.PNG?raw=true)

Swagger-UI is included in the plugin. Once loaded, the plugin will show a Swagger tab in the Node-RED sidebar. From here, you can see the dynamically generated OpenAPI documentation for the current flow. Additionally, you can use the test function to try out your API directly from the editor, providing any parameters you have defined in the docs for the HTTP-In nodes. The Swagger-UI will automatically refresh any time the flow is redeployed.

## Notes

- The `paths` entry of the OpenAPI documentation is generated based on the `HTTP In` nodes present in the flow.
- If an OpenAPI template is not provided, the example above is used as the default.
- If `basePath` is not set in the template, it is set to the value of `httpNodeRoot` if that value is something other than `/`.

###### Attribute definitions provided come from the [OpenAPI Specification Version 3.1.0](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md)
