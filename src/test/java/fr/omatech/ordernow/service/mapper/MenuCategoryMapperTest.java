package fr.omatech.ordernow.service.mapper;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;

public class MenuCategoryMapperTest {

    private MenuCategoryMapper menuCategoryMapper;

    @BeforeEach
    public void setUp() {
        menuCategoryMapper = new MenuCategoryMapperImpl();
    }

    @Test
    public void testEntityFromId() {
        Long id = 1L;
        assertThat(menuCategoryMapper.fromId(id).getId()).isEqualTo(id);
        assertThat(menuCategoryMapper.fromId(null)).isNull();
    }
}
