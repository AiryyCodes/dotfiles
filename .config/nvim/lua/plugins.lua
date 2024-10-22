local plugins = {
    {
        'navarasu/onedark.nvim',
        opts = {
            transparent = true,
        },
    },
    {
        'nvim-tree/nvim-tree.lua',
        dependencies = {
			'nvim-tree/nvim-web-devicons',
		},
		config = function()
            require('config.tree')
        end,
    },
    {
        'neovim/nvim-lspconfig',
        config = function()
            require 'config.lspconfig'
        end,
		dependencies = {
			'hrsh7th/nvim-cmp',
			'hrsh7th/cmp-nvim-lsp',
		},
    },
    {
        'williamboman/mason.nvim',
        opts = {
            ensure_installed = {
                'clangd'
            }
        }
    },
	{
		'saadparwaiz1/cmp_luasnip',
		'L3MON4D3/LuaSnip',
	},
	{
		'hrsh7th/nvim-cmp',
		dependencies = {
			'hrsh7th/cmp-buffer',
			'hrsh7th/cmp-path',
			'hrsh7th/cmp-cmdline',
			'hrsh7th/cmp-nvim-lsp',
		},
		config = function()
			require 'config.cmp'
		end,
	},
	{
		'cohama/lexima.vim',
	},
	{
		'nvim-treesitter/nvim-treesitter',
		build = ':TSUpdate',
		config = function()
			require 'config.treesitter'
		end,
	},
	{
    	'nvim-lualine/lualine.nvim',
    	dependencies = {
			'nvim-tree/nvim-web-devicons'
		},
		config = function()
			require 'config.lualine'
		end,
	},
	{
        "tikhomirov/vim-glsl"
    },
    {
		'jose-elias-alvarez/null-ls.nvim',
		dependencies = {
			'nvim-lua/plenary.nvim',
		},
		event = 'VeryLazy',
		config = function()
			require 'config.null-ls'
		end
	},
	{
		'rcarriga/nvim-dap-ui',
		dependencies = {
			'mfussenegger/nvim-dap',
			'nvim-neotest/nvim-nio',
		},
		event = 'VeryLazy',
		config = function()
			require 'config.dap'

			local dap = require 'dap'
			local dapui = require 'dapui'

			dapui.setup()
			dap.listeners.after.event_initialized['dapui_config'] = function()
				dapui.open()
			end
			dap.listeners.after.event_terminated['dapui_config'] = function()
				dapui.close()
			end
			dap.listeners.after.event_exited['dapui_config'] = function()
				dapui.close()
			end
		end,
	},
	{
		'jay-babu/mason-nvim-dap.nvim',
		dependencies = {
			'williamboman/mason.nvim',
			'mfussenegger/nvim-dap',
		},
		opts = {
			handlers = {},
		}
	},
	{
        "tikhomirov/vim-glsl"
    },
	{
    	"iamcco/markdown-preview.nvim",
    	cmd = { "MarkdownPreviewToggle", "MarkdownPreview", "MarkdownPreviewStop" },
    	ft = { "markdown" },
    	build = function() vim.fn["mkdp#util#install"]() end,
	}
}

return plugins
