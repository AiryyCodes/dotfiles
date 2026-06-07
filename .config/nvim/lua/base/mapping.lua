M = {}

local map = vim.keymap.set
local whichkey = require "which-key"

function M:map(mode, key, callback)
    vim.keymap.set(mode, key, callback)
end

function M:load_mappings(mappings)
    if (mappings.groups) then
        for group, name in pairs(mappings.groups) do
            whichkey.add({
                { group, group = name }
            })
        end
    end

    if (mappings.mappings) then
        for mode, mapping in pairs(mappings.mappings) do
            for key, value in pairs(mapping) do
                local command = value[1]
                local desc = value[2]
                if command then
                    map(mode, key, command, { desc = desc })
                end
            end
        end
    end
end

return M
