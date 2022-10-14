import React, { useState, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import useInput from '../hooks/useInput';
import AddIcon from '@mui/icons-material/Add';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { useDispatch, useSelector } from 'react-redux';

const kind = ['연가', '포상휴가', '보상휴가', '위로휴가', '청원휴가'];

const days = [
  { id: 1, label: '1일' },
  { id: 2, label: '2일' },
  { id: 3, label: '3일' },
  { id: 4, label: '4일' },
  { id: 5, label: '5일' },
  { id: 6, label: '6일' },
  { id: 7, label: '7일' },
  { id: 8, label: '8일' },
  { id: 9, label: '9일' },
  { id: 10, label: '10일' },
  { id: 11, label: '11일' },
  { id: 12, label: '12일' },
  { id: 13, label: '13일' },
  { id: 14, label: '14일' },
  { id: 15, label: '15일' },
  { id: 16, label: '16일' },
  { id: 17, label: '17일' },
  { id: 18, label: '18일' },
  { id: 19, label: '19일' },
  { id: 20, label: '20일' },
  { id: 21, label: '21일' },
  { id: 22, label: '22일' },
  { id: 23, label: '23일' },
  { id: 24, label: '24일' },
  { id: -1, label: '1일 사용' },
  { id: -2, label: '2일 사용' },
  { id: -3, label: '3일 사용' },
  { id: -4, label: '4일 사용' },
  { id: -5, label: '5일 사용' },
  { id: -6, label: '6일 사용' },
  { id: -7, label: '7일 사용' },
  { id: -8, label: '8일 사용' },
  { id: -9, label: '9일 사용' },
  { id: -10, label: '10일 사용' },
  { id: -11, label: '11일 사용' },
  { id: -12, label: '12일 사용' },
  { id: -13, label: '13일 사용' },
  { id: -14, label: '14일 사용' },
  { id: -15, label: '15일 사용' },
];

const VacaAccordion = ({ category, editVa }) => {
  const [content, onChangeContent, setContent] = useInput();
  const { me } = useSelector((state) => state.user);
  const [edit, setEdit] = useState(false);
  const [day, setDay] = useState(days[0]);
  const [records, setRecords] = useState([]);

  const showNum = () => {
    if (category === '0') {
      return <span>{me.annual}</span>;
    } else if (category === '1') {
      return <span>{me.compensation}</span>;
    } else if (category === '2') {
      return <span>{me.reward}</span>;
    } else if (category === '3') {
      return <span>{me.consolation}</span>;
    } else {
      return <span>{me.petition}</span>;
    }
  };

  useEffect(() => {
    const _instance = [];
    if (me) {
      for (let i = 0; i < me.Records?.length; i++) {
        if (me.Records[i].category == category) {
          console.log(me.Records[0].category);
          _instance.push(me.Records[i]);
        }
      }
      setRecords(_instance);
    }
  }, [me]);

  const defaultProps = {
    options: days,
    getOptionLabel: (option) => option.label,
  };

  useEffect(() => {
    console.log(records[0]);
  }, [records]);

  return (
    <Accordion sx={{ border: '2px solid #1B3B1A' }}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel2a-content"
        id="compensation"
      >
        <Typography sx={{ color: '#1B3B1A' }}>
          {kind[category]} : {showNum()}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        {records.map((el, idx) => (
          <div key={idx} style={{ fontSize: '16px', color: '#777' }}>
            {el.num_of_days}일 : {el.reason}
          </div>
        ))}
        {edit === false && (
          <Button onClick={() => setEdit(true)} sx={{ color: '#1B3B1A' }}>
            추가
          </Button>
        )}
        {edit === true && (
          <Grid container spacing={2}>
            <Grid item md={4.5}>
              <Autocomplete
                {...defaultProps}
                id="clear-on-escape"
                clearOnEscape
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="받은 휴가 일수"
                    variant="standard"
                  />
                )}
                value={day}
                onChange={(e, v) => setDay(v)}
              />
            </Grid>
            <Grid item md={6}>
              <TextField
                id="standard-textarea"
                placeholder="휴가 내용"
                variant="standard"
                value={content}
                onChange={onChangeContent}
                sx={{ marginTop: 2 }}
              />
            </Grid>
            <Grid item md={1}>
              <IconButton
                sx={{ marginTop: 2 }}
                onClick={() => editVa(category, content, day.id)}
              >
                <AddIcon />
              </IconButton>
            </Grid>
          </Grid>
        )}
      </AccordionDetails>
    </Accordion>
  );
};

export default VacaAccordion;
