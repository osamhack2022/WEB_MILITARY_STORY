import React, { useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import useInput from "../hooks/useInput"
import AddIcon from '@mui/icons-material/Add';

import VacaAccordion from "./VacaAccordion";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const StyledDiv = styled.div`
	margin-top: 20px;
	flex-wrap: wrap;
	margin-bottom: 20px;
	border: 2px solid #ddd;
	padding: 20px;
`

const ColoredTitle = styled.div`
	color: #777;
	font-size: 25px;
`

const ColoredDiv = styled.div`
	color:#777;
	font-size: 18px;
	display: flex;
`



function MyVacation({sendEditVacation}) {
	
	const [content, onChangeContent, setContent] = useInput('');
	const { me } = useSelector((state)=>state.user)
	
	return (
		<StyledDiv>
			<div style={{ color:'#777', fontSize: '25px'}}>총 휴가 : {me.annual + me.reward + me.compensation + me.consolation + me.petition}</div>
			<VacaAccordion category="0" editVa = {sendEditVacation} />
			<VacaAccordion category="1" editVa = {sendEditVacation} />
			<VacaAccordion category="2" editVa = {sendEditVacation} />
			<VacaAccordion category="3" editVa = {sendEditVacation} />
			<VacaAccordion category="4" editVa = {sendEditVacation} />
		</StyledDiv>
	)
}

export default MyVacation;