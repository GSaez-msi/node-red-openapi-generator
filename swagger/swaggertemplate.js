module.exports = function (RED) {
    "use strict";

    function SwaggerTemplateNode(config) {
        RED.nodes.createNode(this, config);

        this.name = config.name;
        this.active = config.active;
        this.template = null;

        try {
            if (typeof config.template === "string") {
                this.template = JSON.parse(config.template);
            } else {
                this.template = config.template || {};
            }
        } catch (err) {
            this.error("Invalid OpenAPI template JSON");
            this.template = {};
        }
    }

    RED.nodes.registerType("swaggertemplate", SwaggerTemplateNode);
};