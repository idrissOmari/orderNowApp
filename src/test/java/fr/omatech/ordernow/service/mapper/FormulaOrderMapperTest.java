package fr.omatech.ordernow.service.mapper;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;

public class FormulaOrderMapperTest {

    private FormulaOrderMapper formulaOrderMapper;

    @BeforeEach
    public void setUp() {
        formulaOrderMapper = new FormulaOrderMapperImpl();
    }

    @Test
    public void testEntityFromId() {
        Long id = 1L;
        assertThat(formulaOrderMapper.fromId(id).getId()).isEqualTo(id);
        assertThat(formulaOrderMapper.fromId(null)).isNull();
    }
}
