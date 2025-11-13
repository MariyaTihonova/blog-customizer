import { useState, useEffect, useRef } from 'react';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import {
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	ArticleStateType,
	defaultArticleState,
} from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';
import clsx from 'clsx';

type ArticleParamsFormProps = {
	isOpen: boolean;
	onToggle: () => void;
	currentState: ArticleStateType;
	onApply: (state: ArticleStateType) => void;
	onReset: () => void;
};

export const ArticleParamsForm = ({
	isOpen,
	onToggle,
	currentState,
	onApply,
	onReset,
}: ArticleParamsFormProps) => {
	const [formState, setFormState] = useState<ArticleStateType>(currentState);
	const sidebarRef = useRef<HTMLDivElement>(null);

	// Синхронизируем состояние формы при изменении currentState
	useEffect(() => {
		setFormState(currentState);
	}, [currentState]);

	// Обработчик клика вне области сайдбара
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				sidebarRef.current &&
				!sidebarRef.current.contains(event.target as Node)
			) {
				onToggle();
			}
		};

		if (isOpen) {
			document.addEventListener('mousedown', handleClickOutside);
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = 'unset';
		}

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
			document.body.style.overflow = 'unset';
		};
	}, [isOpen, onToggle]);

	const handleFontFamilyChange = (selected: (typeof fontFamilyOptions)[0]) => {
		setFormState((prev) => ({ ...prev, fontFamilyOption: selected }));
	};

	const handleFontSizeChange = (selected: (typeof fontSizeOptions)[0]) => {
		setFormState((prev) => ({ ...prev, fontSizeOption: selected }));
	};

	const handleFontColorChange = (selected: (typeof fontColors)[0]) => {
		setFormState((prev) => ({ ...prev, fontColor: selected }));
	};

	const handleBackgroundColorChange = (
		selected: (typeof backgroundColors)[0]
	) => {
		setFormState((prev) => ({ ...prev, backgroundColor: selected }));
	};

	const handleContentWidthChange = (selected: (typeof contentWidthArr)[0]) => {
		setFormState((prev) => ({ ...prev, contentWidth: selected }));
	};

	const handleApply = (e: React.FormEvent) => {
		e.preventDefault();
		onApply(formState);
	};

	const handleReset = (e: React.FormEvent) => {
		e.preventDefault();
		setFormState(defaultArticleState);
		onReset();
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={onToggle} />
			<aside
				ref={sidebarRef}
				className={clsx(styles.container, { [styles.container_open]: isOpen })}>
				<form
					className={styles.form}
					onSubmit={handleApply}
					onReset={handleReset}>
					<Select
						selected={formState.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={handleFontFamilyChange}
						title='Шрифт'
					/>

					<Separator />

					<RadioGroup
						name='font-size'
						options={fontSizeOptions}
						selected={formState.fontSizeOption}
						onChange={handleFontSizeChange}
						title='Размер шрифта'
					/>

					<Separator />

					<RadioGroup
						name='font-color'
						options={fontColors}
						selected={formState.fontColor}
						onChange={handleFontColorChange}
						title='Цвет шрифта'
					/>

					<Separator />

					<RadioGroup
						name='background-color'
						options={backgroundColors}
						selected={formState.backgroundColor}
						onChange={handleBackgroundColorChange}
						title='Цвет фона'
					/>

					<Separator />

					<RadioGroup
						name='content-width'
						options={contentWidthArr}
						selected={formState.contentWidth}
						onChange={handleContentWidthChange}
						title='Ширина контента'
					/>

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
