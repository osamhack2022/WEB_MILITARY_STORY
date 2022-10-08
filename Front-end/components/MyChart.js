import React, { useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import styled from "styled-components";
import dynamic from "next/dynamic";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import { Dayjs } from "dayjs"
import { editDate, loadMyInfo } from "../actions/user";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';


const Chart = dynamic(
()=> import('react-apexcharts'),
	{ssr: false}
)

const StyledDiv = styled.div`
	marginTop: 20px;
	flexWrap: wrap;
	marginBottom: 20px;
	border: 2px solid #ddd;
	padding: 20px;
`

function MyChart({onEdit, edit, setEdit}) {
	const { me } = useSelector((state)=>state.user);
	const dispatch = useDispatch();
	
	const [value1, setValue1] = useState(me.start_date)
	const [value2, setValue2] = useState(me.end_date);
	const [current, setCurrent] = useState(0);
	const [total, setTotal] = useState(0);
	const [series, setSeries] = useState([0, 0]);
	const [options, setOptions ] = useState({
		series: [current, total-current],
		labels: ['현재 복무일', '남은 복무일'],
		colors: ["#009000", "#aaa"],
		plotOptions: {
			pie: {
				expandOnClick:false,
				donut: {
					size:"50px",
					labels: {
						show: true,
						total: {
							label: '총 복무일',
							show: true,
							showAlways: false,
							fontSize: "20px",
							color:"#2487AB"
						}
					}
				}
			}
		}
	});
	
	useEffect(()=>{
		if(me){
			const day1 = new Date(me.start_date.split('T')[0])
			const day2 = new Date(me.end_date.split('T')[0])
			
			
			const curDay = new Date();
			const totalDate = day2.getTime() - day1.getTime();
			const curDate = curDay.getTime() - day1.getTime();
			
			const cur_ins = Math.floor(Math.abs(Math.abs(curDate / (1000*60*60*24))))
			const total_ins = Math.floor(Math.abs(totalDate / (1000*60*60*24)))
			
			
			setCurrent(cur_ins);
			
			setTotal(total_ins);
						
			setSeries([cur_ins, total_ins-cur_ins])
			
			setOptions(
				{
					series: [cur_ins, total_ins-cur_ins],
					labels: ['현재 복무일', '남은 복무일'],
					colors: ["#009000", "#aaa"],
					plotOptions: {
					pie: {
						expandOnClick:false,
						donut: {
							size:"50px",
							labels: {
								show: true,
								total: {
									label: '총 복무일',
									show: true,
									showAlways: false,
									fontSize: "20px",
									color:"#2487AB"
								}
							}
						}
					}
				}
			}
			)
		}
	},[me])
	
	
	
	
	return (
		<form style={{marginTop:'13px'}}>
		<StyledDiv>
			
		<div style={{color:"#777", alignItems:'center', fontSize: "25px"}}>나의 군생활</div>
		<div style={{ color: "#777"}}>남은 복무일 : {total - current} / 현재 복무일 : {current} </div>
			<Chart 
				options = {options}
				series = {series}
				type="donut"
				width="100%"
				height={300}
			/>
			{(edit===false) && <Button onClick={()=>setEdit(!edit)}>입대일/전역일 수정</Button>}
			{edit && (
			<>
				<Grid container spacing={2}>
						<Grid item xs={12} md={5.5}>
							<LocalizationProvider dateAdapter={AdapterDayjs}>
      					<DatePicker
        					label="입대일"
        					value={value1}
        					onChange={(newValue) => {
          					setValue1(newValue);
        					}}
        					renderInput={(params) => <TextField {...params} />}
									inputFormat="YYYY-MM-DD"
      					/>
							</LocalizationProvider>
						</Grid>
						<Grid item xs={12} md={5.5}>
							<LocalizationProvider dateAdapter={AdapterDayjs}>
      					<DatePicker
        					label="전역일"
        					value={value2}
        					onChange={(newValue) => {
          					setValue2(newValue);
        					}}
        					renderInput={(params) => <TextField {...params} />}
									inputFormat="YYYY-MM-DD"
      					/>
							</LocalizationProvider>
						</Grid>
					</Grid>
				<Button onClick={()=>onEdit(value1, value2)}>수정 완료</Button>
			</>)}
		</StyledDiv>
		
		</form>
	)
	
}

export default MyChart