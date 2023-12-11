(function() {
	let template = document.createElement("template");
	template.innerHTML = `
		<form id="form">
			<fieldset>
				<legend>Podium Properties</legend>
				<table>
                    <tr>
                        <td>Values bold factor</td>
                        <td><input id="bold_forValues" type="text" size="20" maxlength="10"></td>
                    </tr>
                    <tr>
                        <td>Names bold factor</td>
                        <td><input id="bold_forNames" type="text" size="20" maxlength="10"></td>
                    </tr>
				</table>
				<input type="submit" style="display:none;">
			</fieldset>
		</form>
	`;

	class PodiumStylingPanel extends HTMLElement {
		constructor() {
			super();
			this._shadowRoot = this.attachShadow({mode: "open"});
			this._shadowRoot.appendChild(template.content.cloneNode(true));
			this._shadowRoot.getElementById("form").addEventListener("submit", this._submit.bind(this));
		}

		_submit(e) {
			e.preventDefault();
			this.dispatchEvent(new CustomEvent("propertiesChanged", {
					detail: {
						properties: {
							bold_forValues: this.bold_forValues,
                            bold_forNames: this.bold_forNames,
						}
					}
			}));
		}


		set bold_forValues(newValue) {
			this._shadowRoot.getElementById("bold_forValues").value = newValue;
		}

		get bold_forValues() {
			return this._shadowRoot.getElementById("bold_forValues").value;
		}

		set bold_forNames(newValue) {
			this._shadowRoot.getElementById("bold_forNames").value = newValue;
		}

		get bold_forNames()  {
			return this._shadowRoot.getElementById("bold_forNames").value;
		}
	}

	customElements.define("com-sap-sample-podium-styling", PodiumStylingPanel);
})();