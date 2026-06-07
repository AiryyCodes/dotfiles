local config = require "base.config"

-- Automatically install lazy
local lazypath = vim.fn.stdpath("data") .. "/lazy/lazy.nvim"
if not (vim.uv or vim.loop).fs_stat(lazypath) then
    local lazyrepo = "https://github.com/folke/lazy.nvim.git"
    local out = vim.fn.system({ "git", "clone", "--filter=blob:none", "--branch=stable", lazyrepo, lazypath })
    if vim.v.shell_error ~= 0 then
        vim.api.nvim_echo({
            { "Failed to clone lazy.nvim:\n", "ErrorMsg" },
            { out,                            "WarningMsg" },
            { "\nPress any key to exit..." },
        }, true, {})
        vim.fn.getchar()
        os.exit(1)
    end
end
vim.opt.rtp:prepend(lazypath)


local plugins = {}

local function get_user_plugins()
    local plugin_specs = {}
    local plugin_dir = vim.fn.stdpath("config") .. "/lua/user/plugins"

    if config:user_config_exists() then
        for name, type in vim.fs.dir(plugin_dir) do
            if type == "file" and name:sub(-4) == ".lua" then
                local module_name = "user.plugins." .. name:sub(1, -5) -- strip ".lua"
                table.insert(plugin_specs, require(module_name))
            end
        end
    end

    return plugin_specs
end

local function get_base_plugins()
    local plugin_specs = {}
    local plugin_dir = vim.fn.stdpath("config") .. "/lua/base/plugins"

    for name, type in vim.fs.dir(plugin_dir) do
        if type == "file" and name:sub(-4) == ".lua" then
            local module_name = "base.plugins." .. name:sub(1, -5)     -- strip ".lua"
            table.insert(plugin_specs, require(module_name))
        end
    end

    return plugin_specs
end

vim.list_extend(plugins, get_base_plugins())
vim.list_extend(plugins, get_user_plugins())

require("lazy").setup({
    spec = plugins,
    install = { colorscheme = { "catppuccin-mocha" } },
    checker = { enabled = true },
})
