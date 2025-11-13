import { useState, useEffect, useRef } from 'react';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';
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

type ArticleParamsFormProps = {
	currentState: ArticleStateType;
	onApply: (state: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	currentState,
	onApply,
}: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState(false);
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
				setIsOpen(false);
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
	}, [isOpen]);

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
		setIsOpen(false);
	};

	const handleReset = (e: React.FormEvent) => {
		e.preventDefault();
		setFormState(defaultArticleState);
		onApply(defaultArticleState);
		setIsOpen(false);
	};

	const handleToggle = () => {
		setIsOpen(!isOpen);
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={handleToggle} />
			<aside
				ref={sidebarRef}
				className={
					isOpen
						? `${styles.container} ${styles.container_open}`
						: styles.container
				}>
				<form
					className={styles.form}
					onSubmit={handleApply}
					onReset={handleReset}>
					<Text as='h2' size={31} weight={800} uppercase>
						ЗАДАЙТЕ ПАРАМЕТРЫ
					</Text>

					<Select
						selected={formState.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={handleFontFamilyChange}
						title='ШРИФТ'
					/>

					<Separator />

					<RadioGroup
						name='font-size'
						options={fontSizeOptions}
						selected={formState.fontSizeOption}
						onChange={handleFontSizeChange}
						title='РАЗМЕР ШРИФТА'
					/>

					<Separator />

					<Select
						selected={formState.fontColor}
						options={fontColors}
						onChange={handleFontColorChange}
						title='ЦВЕТ ШРИФТА'
					/>

					<Separator />

					<Select
						selected={formState.backgroundColor}
						options={backgroundColors}
						onChange={handleBackgroundColorChange}
						title='ЦВЕТ ФОНА'
					/>

					<Separator />

					<Select
						selected={formState.contentWidth}
						options={contentWidthArr}
						onChange={handleContentWidthChange}
						title='ШИРИНА КОНТЕНТА'
					/>

					<div className={styles.bottomContainer}>
						<Button title='СБРОСИТЬ' htmlType='reset' type='clear' />
						<Button title='ПРИМЕНИТЬ' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
