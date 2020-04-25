package fr.omatech.ordernow.service.mapper;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;

public class FormulaMapperTest {

    private FormulaMapper formulaMapper;

    @BeforeEach
    public void setUp() {
        formulaMapper = new FormulaMapperImpl();
    }

    @Test
    public void testEntityFromId() {
        Long id = 1L;
        assertThat(formulaMapper.fromId(id).getId()).isEqualTo(id);
        assertThat(formulaMapper.fromId(null)).isNull();
    }
}
