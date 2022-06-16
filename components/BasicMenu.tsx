import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { ChevronDownIcon } from '@heroicons/react/outline'
import { useState } from 'react'

export default function BasicMenu() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  //aria-controls:이 탭이 어떤 요소에 대한 컨트롤인지를 참조한다. 연관 요소의 id값을 이용.
  //aria-haspopup="true": 메뉴를 열기 위한 버튼에 설정 혹은 메뉴 항목이 서브메뉴를 가진 경우 설정하며, 메뉴 버튼인 경우 해당 버튼이 팝업 메뉴를 가지고 있음을 스크린 리더 사용자가 알 수 있도록 하기 위해 사용합니다.
  //aria-expanded="true": 메뉴가 확장되었음을 나타낼 때 사용됩니다. 스크린 리더는 <접근성 메뉴 확장됨> 등과 같이 스크린 리더 사용자에게 알립니다.

  return (
    <div className="md:!hidden">
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        className="!capitalize !text-white"
      >
        메뉴&nbsp;
        <ChevronDownIcon className="h-3 w-3" />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        className="menu"
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClose}>홈</MenuItem>
        <MenuItem onClick={handleClose}>시리즈</MenuItem>
        <MenuItem onClick={handleClose}>영화</MenuItem>
        <MenuItem onClick={handleClose}>NEW! 요즘 대세 콘텐츠</MenuItem>
        <MenuItem onClick={handleClose}>내가 찜한 콘텐츠</MenuItem>
      </Menu>
    </div>
  )
}
