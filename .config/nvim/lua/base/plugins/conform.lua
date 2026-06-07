return {
    "stevearc/conform.nvim",
    config = function()
        vim.env.PATH = vim.env.PATH .. ":" .. vim.fn.stdpath("data") .. "/mason/bin"

        local conform = require("conform")
        conform.setup({
            formatters_by_ft = {
                lua = { "stylua" },
                c = { "clang-format" },
                cpp = { "clang-format" },
                arduino = { "clang-format" },
                javascript = { "prettier" },
                javascriptreact = { "prettier" },
                typescript = { "prettier" },
                typescriptreact = { "prettier" },
                rust = { "rustfmt" },
                cs = { "csharpier" },
            },
            formatters = {
                csharpier = {
                    command = "csharpier",
                    args = { "format", "$FILENAME" },
                    stdin = false,
                },
            },
            format_on_save = {
                lsp_fallback = true,
            },
        })

        vim.api.nvim_create_autocmd("BufWritePre", {
            pattern = "*",
            callback = function(args)
                conform.format({ bufnr = args.buf })
            end,
        })
    end,
}
