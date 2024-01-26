import React from "react";
import { TreeView } from "@mui/x-tree-view/TreeView";
import { TreeItem } from "@mui/x-tree-view/TreeItem";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddIcon from "@mui/icons-material/Add";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import GroupIcon from "@mui/icons-material/Group";
import ListAltIcon from "@mui/icons-material/ListAlt";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Link } from "react-router-dom";
import { Dashboard } from "@mui/icons-material";

const Sidebar = () => {
  return (
    <div className="sidebar dashSidebar">
      <div id="dashboardSidebar">
        <TreeView
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpandIcon={<ArrowForwardIosIcon />}
        >
          <Link to="/admin/dashboard" id="adminDash">
            <TreeItem nodeId="1" label="Dashboard" icon={<Dashboard />} />
          </Link>

          <TreeItem nodeId="2" label="Products">
            <Link to="/admin/products/all">
              <TreeItem nodeId="3" label="All" icon={<ShoppingBagIcon />} />
            </Link>
            <Link to="/admin/products/create">
              <TreeItem nodeId="4" label="Create" icon={<AddIcon />} />
            </Link>
          </TreeItem>

          <Link to='/admin/users'>
            <TreeItem nodeId="5" label="Users" icon={<GroupIcon />}></TreeItem>
          </Link>
          
          <Link to='/admin/orders'>
            <TreeItem nodeId="6" label="Orders" icon={<ListAltIcon />}></TreeItem>
          </Link>

        </TreeView>
      </div>
    </div>
  );
};

export default Sidebar;
