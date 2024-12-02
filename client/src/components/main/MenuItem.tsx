interface MenuItemProps {
    label: string;
    onClick: () => void;
}

const MenuItem: React.FC<MenuItemProps> = (props) => {
    return (
        <div onClick={props.onClick} className="px-4 py-3 hover:bg-neutral-100 transition font-semibold"> 
            {props.label}
        </div>
    )
}

export default MenuItem;