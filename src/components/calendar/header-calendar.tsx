import { ChevronLeft, ChevronRight } from "lucide-react";
import { type ReactNode, useState } from "react";
import { Button, IconButton } from "../button";
import { Icon } from "../icon";
import { Popover } from "../popover";
import { Text } from "../text";
import {
  useCalendarConfigContext,
  useCalendarDataContext,
} from "./calendar.context";
import * as styles from "./header-calendar.css";

interface MonthPickerProps {
  currentDate: Date;
  onSelectDate: (date: Date) => void;
  onClose: () => void;
}

function MonthPicker({ currentDate, onSelectDate, onClose }: MonthPickerProps) {
  const [year, setYear] = useState(() => currentDate.getFullYear());
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  return (
    <div className={styles.monthPickerContainer}>
      {/* Year Selector Header */}
      <div className={styles.monthPickerHeader}>
        <IconButton
          variant="standard"
          size="sm"
          onPress={() => setYear((y) => y - 1)}
          aria-label="Previous year"
        >
          <Icon icon={ChevronLeft} />
        </IconButton>
        <Text variant="titleMedium" weight="semibold">
          {year}
        </Text>
        <IconButton
          variant="standard"
          size="sm"
          onPress={() => setYear((y) => y + 1)}
          aria-label="Next year"
        >
          <Icon icon={ChevronRight} />
        </IconButton>
      </div>

      {/* Months Grid */}
      <div className={styles.monthPickerGrid}>
        {months.map((mName, idx) => {
          const isSelected =
            currentDate.getFullYear() === year &&
            currentDate.getMonth() === idx;
          return (
            <Button
              key={mName}
              variant={isSelected ? "filled" : "outlined"}
              size="small"
              onPress={() => {
                const nextDate = new Date(currentDate);
                nextDate.setFullYear(year);
                nextDate.setMonth(idx);
                nextDate.setDate(1); // Avoid overflowing the number of days in the month.
                onSelectDate(nextDate);
                onClose();
              }}
            >
              {mName}
            </Button>
          );
        })}
      </div>
    </div>
  );
}

interface MonthSelectorProps {
  currentDate: Date;
  onSelectDate: (date: Date) => void;
}

function MonthSelector({ currentDate, onSelectDate }: MonthSelectorProps) {
  const monthLabel = currentDate.toLocaleDateString("ru-RU", {
    month: "long",
    year: "numeric",
  });

  const [isOpen, setIsOpen] = useState(false);

  return (
    <Popover isOpen={isOpen} onOpenChange={setIsOpen} placement="bottom start">
      <Popover.Trigger>
        <Button
          variant="text"
          size="medium"
          className={styles.monthSelectorButton}
        >
          {monthLabel} ▾
        </Button>
      </Popover.Trigger>
      <Popover.Content>
        <MonthPicker
          currentDate={currentDate}
          onSelectDate={onSelectDate}
          onClose={() => setIsOpen(false)}
        />
      </Popover.Content>
    </Popover>
  );
}

export interface CalendarHeaderProps {
  /** Additional actions on the right side of the header row (for example, a
   * grid-density switch), rendered after the month selector. */
  actions?: ReactNode;
}

export function CalendarHeader({ actions }: CalendarHeaderProps = {}) {
  const { navigate } = useCalendarConfigContext();
  const { currentDate } = useCalendarDataContext();

  return (
    <div className={styles.header}>
      <Button
        variant="outlined"
        size="small"
        className={styles.todayBtn}
        onPress={() => navigate("today")}
      >
        Today
      </Button>

      <div className={styles.navigation}>
        <IconButton
          variant="standard"
          size="sm"
          onPress={() => navigate("prev")}
          aria-label="Previous period"
        >
          <Icon icon={ChevronLeft} />
        </IconButton>
        <IconButton
          variant="standard"
          size="sm"
          onPress={() => navigate("next")}
          aria-label="Next period"
        >
          <Icon icon={ChevronRight} />
        </IconButton>
      </div>

      <MonthSelector
        currentDate={currentDate}
        onSelectDate={(date) => navigate(date)}
      />

      {actions && <div className={styles.actionsSlot}>{actions}</div>}
    </div>
  );
}
