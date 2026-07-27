// assets/product-custom-property.js
import { Component } from '@theme/component';

/**
 * @typedef {object} ProductCustomPropertyRefs
 * @property {HTMLInputElement | HTMLTextAreaElement} [textInput] - The text input.
 * @property {HTMLInputElement} [fileInput] - The file input.
 * @property {HTMLElement} [characterCount] - The character count element.
 * @property {HTMLElement} [fileName] - The selected file name element.
 */

/**
 * A custom element that manages product custom properties
 * @extends Component<ProductCustomPropertyRefs>
 */
class ProductCustomProperty extends Component {
  handleInput() {
    this.#updateCharacterCount();
  }

  handleFileChange() {
    this.#updateFileName();
  }

  #updateCharacterCount() {
    const { characterCount, textInput } = this.refs;
    if (!characterCount || !textInput) return;

    const currentLength = textInput.value.length;
    const maxLength = textInput.maxLength;

    const template = characterCount.getAttribute('data-template');
    if (!template) return;

    const updatedText = template.replace('[current]', currentLength.toString()).replace('[max]', maxLength.toString());

    characterCount.textContent = updatedText;
  }

  #updateFileName() {
    const { fileInput, fileName } = this.refs;
    if (!fileInput || !fileName) return;

    const selectedFile = fileInput.files?.[0];
    const emptyText = fileName.getAttribute('data-empty-text') || '';

    if (selectedFile) {
      fileName.textContent = selectedFile.name;
      fileName.setAttribute('data-has-file', 'true');
    } else {
      fileName.textContent = emptyText;
      fileName.removeAttribute('data-has-file');
    }
  }
}

customElements.define('product-custom-property-component', ProductCustomProperty);
