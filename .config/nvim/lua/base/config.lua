local M = {}

local custom_path = vim.fn.stdpath("config") .. "/lua/user/init.lua"

function M:user_config_exists()
    return vim.loop.fs_stat(custom_path) ~= nil
end

return M
