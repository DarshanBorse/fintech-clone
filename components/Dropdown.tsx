import React from "react";
import * as DropdownMenu from "zeego/dropdown-menu";
import RoundButton from "./RoundButton";

const Dropdown = () => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <RoundButton icon={"ellipsis-horizontal"} text="More" />
      </DropdownMenu.Trigger>

      <DropdownMenu.Content>
        <DropdownMenu.Item key="statement">
          <DropdownMenu.ItemTitle>Statement</DropdownMenu.ItemTitle>
          <DropdownMenu.ItemIcon androidIconName="ic_menu_slideshow" style={{ width: 24, height: 24 }} />
        </DropdownMenu.Item>

        <DropdownMenu.Item key="converter">
          <DropdownMenu.ItemTitle>Converter</DropdownMenu.ItemTitle>
          <DropdownMenu.ItemIcon androidIconName="dark_header" style={{ width: 24, height: 24 }} />
        </DropdownMenu.Item>

        <DropdownMenu.Item key="background">
          <DropdownMenu.ItemTitle>Background</DropdownMenu.ItemTitle>
          <DropdownMenu.ItemIcon androidIconName="dark_header" style={{ width: 24, height: 24 }} />
        </DropdownMenu.Item>

        <DropdownMenu.Item key="account">
          <DropdownMenu.ItemTitle>Add new Account</DropdownMenu.ItemTitle>
          <DropdownMenu.ItemIcon androidIconName="dark_header" style={{ width: 24, height: 24 }} />
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};

export default Dropdown;