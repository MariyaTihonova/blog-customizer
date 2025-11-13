import arrow from 'src/images/arrow.svg';
import styles from './ArrowButton.module.scss';

type ArrowButtonProps = {
	isOpen: boolean;
	onClick: () => void;
};

export const ArrowButton = ({ isOpen, onClick }: ArrowButtonProps) => {
	return (
		<div
			role='button'
			aria-label='Открыть/Закрыть форму параметров статьи'
			tabIndex={0}
			className={
				isOpen
					? `${styles.container} ${styles.container_open}`
					: styles.container
			}
			onClick={onClick}
			onKeyDown={(e) => {
				if (e.key === 'Enter' || e.key === ' ') {
					e.preventDefault();
					onClick();
				}
			}}>
			<img
				src={arrow}
				alt='иконка стрелочки'
				className={
					isOpen ? `${styles.arrow} ${styles.arrow_open}` : styles.arrow
				}
			/>
		</div>
	);
};
