import {styled} from "@mui/material/styles"

const StyledAvatar=stlyed(Avatar)(({theme})=>({
	width:35,
	height:35,
	fontSize:15,
	backgroundColor:'grey'
}))

const StyledFormGroup = styled(FormGroup)(({theme})=>({
	position:'relative',
}))

const StyledLoadingButton = styled(LoadingButton)(({theme})=>({
	position:'absolute',
	right:0,
	bottom:-40,
	zIndex:2
}))

const StyledButton = styled(Button)(({theme})=>({
	position:'absolute',
	right:0,
	bottom:-40,
	zIndex: 2
}))