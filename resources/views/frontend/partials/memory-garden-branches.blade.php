{{-- Decorative stems connect the wildlife scene to the memory garden. --}}
@foreach(['left','right'] as $side)
<svg class="memory-branch memory-branch--{{ $side }}" viewBox="0 0 200 360" fill="none" aria-hidden="true" focusable="false">
 <path d="M20 0C120 60 20 110 94 173S155 264 178 360" stroke="#718578" stroke-width="2"/>
 <path d="M73 72C38 71 23 49 29 28C59 32 76 49 73 72ZM66 109C105 108 126 89 125 66C95 70 75 86 66 109ZM73 148C37 148 18 128 19 104C49 108 67 123 73 148ZM105 187C138 179 155 157 149 133C121 144 108 162 105 187ZM134 237C95 241 72 223 69 199C101 198 122 213 134 237ZM152 279C183 265 194 242 184 222C161 234 151 255 152 279Z" fill="#688879" opacity=".65"/>
 <path d="M96 175Q39 192 30 231M151 282Q106 294 92 334" stroke="#b68b48" stroke-width="1.5"/>
 <g fill="#d8a94c"><circle cx="30" cy="231" r="6"/><circle cx="92" cy="334" r="5"/><circle cx="49" cy="203" r="3"/><circle cx="117" cy="307" r="3"/></g>
</svg>
@endforeach