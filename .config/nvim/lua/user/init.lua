M = {}

require "user.options"

M.mappings = require "user.mappings"

local capabilities = require("cmp_nvim_lsp").default_capabilities()

vim.lsp.config("qml-language-server", {
    cmd = { "qml-language-server" },
    filetypes = { "qml" },
    root_markers = { { "qmldir", "shell.qml" }, ".git" },
})

vim.lsp.enable("qml-language-server")

vim.cmd("colorscheme catppuccin-mocha")

return M
