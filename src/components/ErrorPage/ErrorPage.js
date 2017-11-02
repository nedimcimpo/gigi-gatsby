import { h } from 'preact';
import './styles.scss';

export const ErrorPage = props => (
	<section id="error" class="error__page">
		<div class="code-area">
			<span style="color: #777;font-style:italic;">
				// oops.Page not supported.
			</span>
			<span>
				<span style="color:#d65562;">if</span>
				{'('}
				<span style="font-style: italic;color:#bdbdbd;">found</span>
				{')'}
				{'{'}
			</span>
			<span>
				<span style="padding-left: 15px;color:#2796ec">
					<i style="width: 10px;display:inline-block" />throw
				</span>
				<span>
					{'('}
					<span style="color: #a6a61f">
						"Mobile view currently under construction"
					</span>
					{');'}
				</span>
				<span style="display:block">}</span>
			</span>
		</div>
	</section>
);
