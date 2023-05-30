import styled from "styled-components";

const StyledInput = styled.select`
  border-radius: 5px;
  padding: 5px;
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
const Title = styled.div`
  font-size: small;
`;
const Select = function ({ ...props }) {
  return (
    <Container>
     
      <Title>{props.name}:</Title>
      <StyledInput
        multiple={props.multiple}
        value={props.value?.[props.name] 
          ? props.multiple 
            ? props.value[props.name].split(",")
            : props.value[props.name]
          :""}
        onChange={(e) => {
          
          const selectedValues = 
          (props.multiple) 
          ? Array.from(
            e.target.selectedOptions,
            (option) => option.value
          ) 
          : e.target.value;
          console.log(e.target.value)
          props.setValue({ ...props.value, [props.name]: props.multiple ? selectedValues.join(",") : selectedValues });
        }}
      >
        <option value={""}>Seleccionar una opcion</option>
        {props.options &&
          props.options.map((o) => {
            return (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            );
          })}
      </StyledInput>
    </Container>
  );
};
export default Select;
