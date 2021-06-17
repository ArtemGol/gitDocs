import React from 'react';
import styled from "styled-components";

export const InputS = styled.input<{home: boolean}>`
  padding: ${props => props.home ? '5px 35px' : '0px 10px'};
  font-size: ${props => props.home ? '16px' : '12px'};
  line-height: 20px;
  color: #24292e;
  vertical-align: middle;
  background-color: #ffffff;
  background-repeat: no-repeat;
  background-position: right 8px center;
  border: 1px solid #e1e4e8;
  border-radius: 6px;
  outline: none;
  height: ${props => props.home ? '42px' : '24px'};
  width: 100%;
  :focus{
    border: 1px solid #3076E1;
    box-shadow: 0 0 1pt 2pt #9EC3ED;
  }
`

export const TextAreaS = styled.textarea`
  padding: 0 10px;
  font-size: 12px;
  line-height: 20px;
  margin-bottom: 10px;
  color: #24292e;
  vertical-align: middle;
  background-color: #ffffff;
  background-repeat: no-repeat;
  background-position: right 8px center;
  border: 1px solid #e1e4e8;
  border-radius: 6px;
  outline: none;
  height: 48px;
  resize: vertical;
  width: 100%;
  :focus{
    border: 1px solid #3076E1;
    box-shadow: 0 0 1pt 2pt #9EC3ED;
  }
`


