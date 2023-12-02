import '../App.css';
import { Popover, PopoverHandler, PopoverContent, Button } from "@material-tailwind/react";

function Popup({openPopover, setOpenPopover}) {
    if(openPopover){
          setTimeout(() => {
            setOpenPopover(false);
          }, 2500);
    }

    // needs styling, it doesn't seem to have a background

  return (
    <div>
        <Popover open={openPopover} placement="top-end">
            <PopoverHandler>
                <Button className='invisibleButton'> </Button>
            </PopoverHandler>
            <PopoverContent className='bg-gray-900 text-white popup'>
            <div>
                <h1>Suceess</h1>
            </div>
            <div>
                <p>Product has been added</p>
            </div>
            </PopoverContent>
        </Popover>
    </div>
  );
}

export default Popup;