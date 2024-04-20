import { Typography } from "@mui/material"

const Header = ({title,textCenter ,bgColor ,textColor,pad })=> {
    return(
        <Typography variant="p" component="p"  sx={{ mb: 5, mt: 2 ,fontWeight:'bold',p:pad ,textAlign:textCenter , background:bgColor , color:textColor }}>
            {title}
        </Typography>
    )
}
export default Header