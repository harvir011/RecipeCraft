import { useState } from 'react';
import { X } from 'lucide-react';

export default function TagInput({ label, tags = [], onChange, placeholder = 'Type and press Enter...' }) {
  const [input, setInput] = useState('');

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && input.trim()) {
      e.preventDefault();
      const newTag = input.trim();
      if (!tags.includes(newTag)) {
        onChange([...tags, newTag]);
        setInput('');
      }
    }
  };

  const removeTag = (index) => {
    onChange(tags.filter((_, i) => i !== index));
  };

  return (
    <div className="w-full">
      {label && (
        <label className="block font-semibold text-charcoal mb-3">
          {label}
        </label>
      )}

      {/* Tags Display */}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag, index) => (
            <div
              key={index}
              className="bg-fresh-green-light text-fresh-green px-4 py-2 rounded-full font-semibold text-sm flex items-center gap-2 shadow-sm hover:shadow-md transition-shadow"
            >
              {tag}
              <button
                type="button"
                onClick={() => removeTag(index)}
                className="text-fresh-green hover:text-fresh-green-dark transition-colors"
              >
                <X size={16} />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Input */}
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl font-body text-charcoal placeholder-charcoal-light focus:outline-none focus:border-fresh-green focus:shadow-green-glow transition-all"
      />
      <p className="text-xs text-charcoal-light mt-2 font-medium">
        Press Enter to add ingredient
      </p>
    </div>
  );
}
