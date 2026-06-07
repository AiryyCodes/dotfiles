require "base.lazy"
require "base.lsp"

local config = require "base.config"
local mapping = require "base.mapping"

if config:user_config_exists() then
    local userrc = require "user"

    mapping:load_mappings(userrc.mappings)
end
