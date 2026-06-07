return {
    "folke/which-key.nvim",
    event = "VeryLazy",
    opts = {},
    config = function()
        local whichkey = require "which-key"
        whichkey.setup({})
    end
}
