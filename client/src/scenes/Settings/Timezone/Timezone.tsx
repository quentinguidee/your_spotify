import { Select, MenuItem } from '@mui/material';
import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { changeTimezone } from '../../../services/redux/modules/settings/thunk';
import { selectTimezone } from '../../../services/redux/modules/user/selector';
import { useAppDispatch } from '../../../services/redux/tools';
import SettingLine from '../SettingLine';
import { timezones } from './timezones';

export default function Timezone() {
  const dispatch = useAppDispatch();
  const dark = useSelector(selectTimezone);

  const handleChangeTimezone = useCallback(
    (newTimezone: string | null | undefined) => {
      if (newTimezone === 'follow') {
        newTimezone = null;
      }
      dispatch(changeTimezone(newTimezone));
    },
    [dispatch],
  );

  return (
    <div>
      <SettingLine
        left="Timezone"
        right={
          <Select
            variant="standard"
            value={dark}
            onChange={ev => handleChangeTimezone(ev.target.value)}>
            <MenuItem value="follow">Default timezone</MenuItem>
            {timezones.map(timezone => (
              <MenuItem key={timezone} value={timezone}>
                {timezone}
              </MenuItem>
            ))}
          </Select>
        }
      />
    </div>
  );
}