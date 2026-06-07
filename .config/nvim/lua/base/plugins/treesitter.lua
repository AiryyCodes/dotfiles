return {
    "nvim-treesitter/nvim-treesitter",
    lazy = false,
    build = ":TSUpdate",
    config = function()
        --[[
        require 'nvim-treesitter'.setup {
            -- Directory to install parsers and queries to (prepended to `runtimepath` to have priority)
            install_dir = vim.fn.stdpath('data') .. '/site',
            highlight = { enable = true },
            indent = { enable = true }
        }
        ]]

        require 'nvim-treesitter'.install {
            "lua"
        }

        vim.api.nvim_create_autocmd('FileType', {
            pattern = { "cpp", "scss", "typescript", "typescriptreact" },
            callback = function() vim.treesitter.start() end,
        })
    end,
}
