		//BootstrapTable "extension"
		!function($){

			'use strict';


			//=======================================
			//Inaccessible BootstrapTable functions
			//=======================================
			var calculateObjectValue = function (self, name, args, defaultValue) {
		        var func = name;

		        if (typeof name === 'string') {
		            // support obj.func1.func2
		            var names = name.split('.');

		            if (names.length > 1) {
		                func = window;
		                $.each(names, function (i, f) {
		                    func = func[f];
		                });
		            } else {
		                func = window[name];
		            }
		        }
		        if (typeof func === 'object') {
		            return func;
		        }
		        if (typeof func === 'function') {
		            return func.apply(self, args || []);
		        }
		        if (!func && typeof name === 'string' && sprintf.apply(this, [name].concat(args))) {
		            return sprintf.apply(this, [name].concat(args));
		        }
		        return defaultValue;
		    };

		    var sprintf = function (str) {
		        var args = arguments,
		            flag = true,
		            i = 1;

		        str = str.replace(/%s/g, function () {
		            var arg = args[i++];

		            if (typeof arg === 'undefined') {
		                flag = false;
		                return '';
		            }
		            return arg;
		        });
		        return flag ? str : '';
		    };

		    var getItemField = function (item, field, escape) {
		        var value = item;

		        if (typeof field !== 'string' || item.hasOwnProperty(field)) {
		            return escape ? escapeHTML(item[field]) : item[field];
		        }
		        var props = field.split('.');
		        for (var p in props) {
		            if (props.hasOwnProperty(p)) {
		                value = value && value[props[p]];
		            }
		        }
		        return escape ? escapeHTML(value) : value;
		    };

		    var getPropertyFromOther = function (list, from, to, value) {
		        var result = '';
		        $.each(list, function (i, item) {
		            if (item[from] === value) {
		                result = item[to];
		                return false;
		            }
		            return true;
		        });
		        return result;
		    };

		    //====================================
			// New options
			//====================================
			$.extend($.fn.bootstrapTable.defaults, {
				cardFormatter: undefined //function(row) { return ''; }
		    });


			//====================================
			// Functions override
			//====================================
			var BootstrapTable = $.fn.bootstrapTable.Constructor;

			BootstrapTable.prototype.initRow = function(item, i, data, parentDom) {

		        var that=this,
		            key,
		            html = [],
		            style = {},
		            csses = [],
		            data_ = '',
		            attributes = {},
		            htmlAttributes = [];

		        if ($.inArray(item, this.hiddenRows) > -1) {
		            return;
		        }

		        style = calculateObjectValue(this.options, this.options.rowStyle, [item, i], style);

		        if (style && style.css) {
		            for (key in style.css) {
		                csses.push(key + ': ' + style.css[key]);
		            }
		        }

		        attributes = calculateObjectValue(this.options,
		            this.options.rowAttributes, [item, i], attributes);

		        if (attributes) {
		            for (key in attributes) {
		                htmlAttributes.push(sprintf('%s="%s"', key, escapeHTML(attributes[key])));
		            }
		        }

		        if (item._data && !$.isEmptyObject(item._data)) {
		            $.each(item._data, function(k, v) {
		                // ignore data-index
		                if (k === 'index') {
		                    return;
		                }
		                data_ += sprintf(' data-%s="%s"', k, v);
		            });
		        }

		        html.push('<tr',
		            sprintf(' %s', htmlAttributes.join(' ')),
		            sprintf(' id="%s"', $.isArray(item) ? undefined : item._id),
		            sprintf(' class="%s"', style.classes || ($.isArray(item) ? undefined : item._class)),
		            sprintf(' data-index="%s"', i),
		            sprintf(' data-uniqueid="%s"', item[this.options.uniqueId]),
		            sprintf('%s', data_),
		            '>'
		        );

		        if (this.options.cardView) {
		            html.push(sprintf('<td colspan="%s"><div class="card-views">', this.header.fields.length));
		        }

		        if (!this.options.cardView && this.options.detailView) {
		            html.push('<td>');

		            if (calculateObjectValue(null, this.options.detailFilter, [i, item])) {
		                html.push('<a class="detail-icon" href="#">',
		                sprintf('<i class="%s %s"></i>', this.options.iconsPrefix, this.options.icons.detailOpen),
		                '</a>');
		            }

		            html.push('</td>');
		        }

		        // <HERE IS INJECTED THE CUSTOM CARD VIEW>
		        var cardViewHtml = null;
		        if (that.options.cardView && (cardViewHtml = calculateObjectValue(that, that.options.cardFormatter, [item], null)) != null) {

		            if (typeof cardViewHtml !== 'string')
		                throw new TypeError('cardFormatter should return a string');

		            html.push(cardViewHtml);

		        } 
 				// </HERE IS INJECTED THE CUSTOM CARD VIEW>
		        else {

		            $.each(this.header.fields, function(j, field) {
		                var text = '',
		                    value_ = getItemField(item, field, that.options.escape),
		                    value = '',
		                    type = '',
		                    cellStyle = {},
		                    id_ = '',
		                    class_ = that.header.classes[j],
		                    data_ = '',
		                    rowspan_ = '',
		                    colspan_ = '',
		                    title_ = '',
		                    column = that.columns[j];

		                if (that.fromHtml && typeof value_ === 'undefined') {
		                    if((!column.checkbox) && (!column.radio)) {
		                        return;
		                    }
		                }

		                if (!column.visible) {
		                    return;
		                }

		                if (that.options.cardView && (!column.cardVisible)) {
		                    return;
		                }

		                if (column.escape) {
		                    value_ = escapeHTML(value_);
		                }

		                style = sprintf('style="%s"', csses.concat(that.header.styles[j]).join('; '));

		                // handle td's id and class
		                if (item['_' + field + '_id']) {
		                    id_ = sprintf(' id="%s"', item['_' + field + '_id']);
		                }
		                if (item['_' + field + '_class']) {
		                    class_ = sprintf(' class="%s"', item['_' + field + '_class']);
		                }
		                if (item['_' + field + '_rowspan']) {
		                    rowspan_ = sprintf(' rowspan="%s"', item['_' + field + '_rowspan']);
		                }
		                if (item['_' + field + '_colspan']) {
		                    colspan_ = sprintf(' colspan="%s"', item['_' + field + '_colspan']);
		                }
		                if (item['_' + field + '_title']) {
		                    title_ = sprintf(' title="%s"', item['_' + field + '_title']);
		                }
		                cellStyle = calculateObjectValue(that.header,
		                    that.header.cellStyles[j], [value_, item, i, field], cellStyle);
		                if (cellStyle.classes) {
		                    class_ = sprintf(' class="%s"', cellStyle.classes);
		                }
		                if (cellStyle.css) {
		                    var csses_ = [];
		                    for (var key in cellStyle.css) {
		                        csses_.push(key + ': ' + cellStyle.css[key]);
		                    }
		                    style = sprintf('style="%s"', csses_.concat(that.header.styles[j]).join('; '));
		                }

		                value = calculateObjectValue(column,
		                    that.header.formatters[j], [value_, item, i, field], value_);

		                if (item['_' + field + '_data'] && !$.isEmptyObject(item['_' + field + '_data'])) {
		                    $.each(item['_' + field + '_data'], function(k, v) {
		                        // ignore data-index
		                        if (k === 'index') {
		                            return;
		                        }
		                        data_ += sprintf(' data-%s="%s"', k, v);
		                    });
		                }

		                if (column.checkbox || column.radio) {
		                    type = column.checkbox ? 'checkbox' : type;
		                    type = column.radio ? 'radio' : type;

		                    text = [sprintf(that.options.cardView ?
		                            '<div class="card-view %s">' : '<td class="bs-checkbox %s">', column['class'] || ''),
		                        '<input' +
		                        sprintf(' data-index="%s"', i) +
		                        sprintf(' name="%s"', that.options.selectItemName) +
		                        sprintf(' type="%s"', type) +
		                        sprintf(' value="%s"', item[that.options.idField]) +
		                        sprintf(' checked="%s"', value === true ||
		                            (value_ || value && value.checked) ? 'checked' : undefined) +
		                        sprintf(' disabled="%s"', !column.checkboxEnabled ||
		                            (value && value.disabled) ? 'disabled' : undefined) +
		                        ' />',
		                        that.header.formatters[j] && typeof value === 'string' ? value : '',
		                        that.options.cardView ? '</div>' : '</td>'
		                    ].join('');

		                    item[that.header.stateField] = value === true || (!!value_ || value && value.checked);
		                } else {
		                    value = typeof value === 'undefined' || value === null ?
		                        that.options.undefinedText : value;
		                 
		                    text = that.options.cardView ? ['<div class="card-view">',
		                        that.options.showHeader ? sprintf('<span class="title" %s>%s</span>', style,
		                            getPropertyFromOther(that.columns, 'field', 'title', field)) : '',
		                        sprintf('<span class="value">%s</span>', value),
		                        '</div>'
		                    ].join('') : [sprintf('<td%s %s %s %s %s %s %s>',
		                            id_, class_, style, data_, rowspan_, colspan_, title_),
		                        value,
		                        '</td>'
		                    ].join('');

		                    // Hide empty data on Card view when smartDisplay is set to true.
		                    if (that.options.cardView && that.options.smartDisplay && value === '') {
		                        // Should set a placeholder for event binding correct fieldIndex
		                        text = '<div class="card-view"></div>';
		                    }
		                }

		                html.push(text);
		            });

		        }

		        if (this.options.cardView) {
		            html.push('</div></td>');
		        }
		        html.push('</tr>');

		        return html.join(' ');
		    };

		}(jQuery);
		
		