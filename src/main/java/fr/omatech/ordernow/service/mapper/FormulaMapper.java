package fr.omatech.ordernow.service.mapper;


import fr.omatech.ordernow.domain.*;
import fr.omatech.ordernow.service.dto.FormulaDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Formula} and its DTO {@link FormulaDTO}.
 */
@Mapper(componentModel = "spring", uses = {MenuMapper.class})
public interface FormulaMapper extends EntityMapper<FormulaDTO, Formula> {

    @Mapping(source = "menu.id", target = "menuId")
    FormulaDTO toDto(Formula formula);

    @Mapping(target = "listProducts", ignore = true)
    @Mapping(target = "removeListProduct", ignore = true)
    @Mapping(source = "menuId", target = "menu")
    Formula toEntity(FormulaDTO formulaDTO);

    default Formula fromId(Long id) {
        if (id == null) {
            return null;
        }
        Formula formula = new Formula();
        formula.setId(id);
        return formula;
    }
}
