import './styles.scss';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { changeTheme, selectCurrentTheme } from '@/store/theme';
import { ColorMode } from '@/types/theme';

export default function ThemeSwitch() {
  const mode = useAppSelector(selectCurrentTheme);
  const dispatch = useAppDispatch();

  function handleChangeTheme() {
    dispatch(changeTheme());
  }

  return (
    <label className='theme-switch'>
      <input
        className='theme-switch__button'
        type='checkbox'
        defaultChecked={mode == ColorMode.Light}
        onClick={handleChangeTheme}
      />
      <span className='theme-switch__span'></span>
    </label>
  );
}
