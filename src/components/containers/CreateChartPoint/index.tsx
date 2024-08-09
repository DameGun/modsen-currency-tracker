import { ChangeEvent, Component, FormEvent } from 'react';
import { connect } from 'react-redux';
import { FinancialDataPoint } from 'chart.js';
import { DateTime } from 'luxon';
import FormField from '../FormField';

import './styles.scss';
import { Button, Input, Select } from '@/components/ui';
import { RootState } from '@/store';
import { selectCurrenciesCodes } from '@/store/currencies';
import type { FinancialDataPointToAdd, PointValidationErrors } from '@/types/chart';
import type { INotifier } from '@/types/observable';
import { ObserveableActionType } from '@/types/observable';

const mapStateToProps = (state: RootState) => ({
  currencyCodes: Object.keys(selectCurrenciesCodes(state)),
});

type PropsFromRedux = ReturnType<typeof mapStateToProps>;

interface CreateChartPointProps extends INotifier<FinancialDataPointToAdd>, PropsFromRedux {}
interface CreateChartPointState {
  date: string;
  point: FinancialDataPoint;
  selectedCurrency: string;
  errors: PointValidationErrors;
}

class CreateChartPoint extends Component<CreateChartPointProps, CreateChartPointState> {
  pointInitialValues: FinancialDataPoint = { x: 0, o: 0, h: 0, l: 0, c: 0 };
  errorsInitialValues: PointValidationErrors = {
    x: false,
    o: false,
    h: false,
    l: false,
    c: false,
    currency: false,
  };

  constructor(props: CreateChartPointProps) {
    super(props);
    this.state = {
      date: '',
      point: this.pointInitialValues,
      selectedCurrency: '',
      errors: this.errorsInitialValues,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSelectedCurrency = this.handleSelectedCurrency.bind(this);
    this.handleDate = this.handleDate.bind(this);
    this.handlePointValuesChange = this.handlePointValuesChange.bind(this);
    this.clearForm = this.clearForm.bind(this);
  }

  handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formattedDate = DateTime.fromJSDate(new Date(this.state.date));

    const newPoint: FinancialDataPointToAdd = {
      datasetLabel: this.state.selectedCurrency,
      point: { ...this.state.point, x: formattedDate.valueOf() },
    };

    const errors = this.validate(newPoint);

    if (!Object.values(errors).includes(true)) {
      this.props.notify(newPoint, ObserveableActionType.created);
      this.clearForm();
    }

    this.setState({ errors });
  }

  handleSelectedCurrency(value: string) {
    this.setState({
      selectedCurrency: value,
    });
  }

  handleDate(e: ChangeEvent<HTMLInputElement>) {
    this.setState({ date: e.target.value });
  }

  validate(data: FinancialDataPointToAdd) {
    const errors: PointValidationErrors = { ...this.errorsInitialValues };

    if (!data.datasetLabel) errors.currency = true;

    let key: keyof FinancialDataPoint;

    for (key in data.point) {
      if (data.point[key] === undefined || data.point[key] <= 0) {
        errors[key] = true;
      }
    }

    return errors;
  }

  clearForm() {
    this.setState({
      selectedCurrency: '',
      date: '',
      point: { ...this.pointInitialValues },
      errors: { ...this.errorsInitialValues },
    });
  }

  handlePointValuesChange(e: ChangeEvent<HTMLInputElement>) {
    this.setState((prevState) => ({
      point: { ...prevState.point, [e.target.id]: e.target.value },
    }));
  }

  render() {
    return (
      <form className='create-chart-point__container' onSubmit={this.handleSubmit}>
        <FormField
          className='create-chart-point__field'
          isValidationFailed={this.state.errors.currency}
          errorText='Currency must be provided'
        >
          <div className='create-chart-point__section'>
            <label>Currency:</label>
            <Select
              id='currency-select'
              options={this.props.currencyCodes}
              selected={this.state.selectedCurrency}
              onChange={this.handleSelectedCurrency}
            />
          </div>
        </FormField>
        <FormField
          className='create-chart-point__field'
          isValidationFailed={this.state.errors.x}
          errorText='Invalid date'
        >
          <div className='create-chart-point__section'>
            <label>Date:</label>
            <Input
              id='date'
              name='date'
              type='date'
              value={this.state.date}
              onChange={this.handleDate}
              required
            />
          </div>
        </FormField>
        <FormField
          className='create-chart-point__field'
          isValidationFailed={this.state.errors.o}
          errorText='Value must be greater then zero'
        >
          <div className='create-chart-point__section'>
            <label>O:</label>
            <Input
              id='o'
              name='open'
              type='number'
              required
              step='.01'
              value={this.state.point.o}
              onChange={this.handlePointValuesChange}
              min={0}
            />
          </div>
        </FormField>
        <FormField
          className='create-chart-point__field'
          isValidationFailed={this.state.errors.h}
          errorText='Value must be greater then zero'
        >
          <div className='create-chart-point__section'>
            <label>H:</label>
            <Input
              id='h'
              name='high'
              type='number'
              required
              step='.01'
              value={this.state.point.h}
              onChange={this.handlePointValuesChange}
              min={0}
            />
          </div>
        </FormField>
        <FormField
          className='create-chart-point__field'
          isValidationFailed={this.state.errors.l}
          errorText='Value must be greater then zero'
        >
          <div className='create-chart-point__section'>
            <label>L:</label>
            <Input
              id='l'
              name='low'
              type='number'
              required
              step='.01'
              value={this.state.point.l}
              onChange={this.handlePointValuesChange}
              min={0}
            />
          </div>
        </FormField>
        <FormField
          className='create-chart-point__field'
          isValidationFailed={this.state.errors.c}
          errorText='Value must be greater then zero'
        >
          <div className='create-chart-point__section'>
            <label>C:</label>
            <Input
              id='c'
              name='close'
              type='number'
              required
              step='.01'
              value={this.state.point.c}
              onChange={this.handlePointValuesChange}
              min={0}
            />
          </div>
        </FormField>
        <Button className='create-chart-point__submit-button' type='submit'>
          Add point
        </Button>
      </form>
    );
  }
}

export default connect(mapStateToProps)(CreateChartPoint);
