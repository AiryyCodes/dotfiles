local M = {}

M.mappings = {
    n = {
        ["<leader>ff"] = { "<cmd>Telescope find_files<cr>", "Find files" },
        ["<leader>fg"] = { "<cmd>Telescope live_grep<cr>", "Live Grep" },
        ["<leader>b"] = { "<cmd>NvimTreeToggle<cr>", "Toggle tree" },
    },
}

M.groups = {
    ["<leader>f"] = "File",
}

return M
