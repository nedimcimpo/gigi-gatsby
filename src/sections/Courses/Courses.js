import { h } from 'preact';
import Image from '../../components/image';

import './style.scss';

export const Courses = props => (
	<section id="courses" class="courses block my-5">
		<div class="courses__inner mx-auto">
			<h3 class="g-title mb-5">Courses</h3>
			<div class="relative grid grid-gap-2 grid-cols-3 courses__wrapper">
				{props.data.map((item, index) => (
					<div class="course">
						<Image name={item.image} location="courses" />
						<div class="course__caption">
							<h6 class="course__title mb-2">{item.title}</h6>
							<div class="course__body pr-3 m-0">{item.body}</div>
						</div>
					</div>
				))}
			</div>
		</div>
	</section>
);
